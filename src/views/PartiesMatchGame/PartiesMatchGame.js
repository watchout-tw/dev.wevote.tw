import React, { Component, PropTypes } from 'react';
import { Link } from "react-router";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';

import QAItem from '../../components/QAItem/QAItem';
import PKer from '../../components/PKer/PKer';

import people_name2id from '../../utils/people_name2id';
import eng2party_short from '../../utils/eng2party_short';
import eng2cht from '../../utils/eng2cht';
import url2eng from '../../utils/url2eng';
import parseToPartyPosition from '../../utils/parseToPartyPosition';
import getPartiesMatchgameData from '../../utils/getPartiesMatchgameData';
import scrollTo from '../../utils/scrollTo';

@connect(
    state => ({
      legislators: state.legislators,
      records: state.records,
      issues: state.issues,
      partyPromises: state.partyPromises
    }),
    dispatch => bindActionCreators({}, dispatch))

export default class PartiesMatchGame extends Component {
  static propTypes = {
      issues: PropTypes.object.isRequired
  }
  constructor(props){ super(props)
      //prepare qa set
      let qaSet = Object.keys(props.issues).map((issueUrl, index)=>{
        return {
            id: `Question${index}`,
            issueName: url2eng(issueUrl),
            order: index,
            title: props.issues[issueUrl].title,
            description: props.issues[issueUrl].question,
            statement: props.issues[issueUrl].statement,
        }
      })
      this.state = {
          qaSet: qaSet,
          currentQAItemIndex: 0,
          userChoices: {
            // Format // "marriage-equality":"aye"
          },
          progress: 'config', // config->game->result
          completed: false,
          currentRank: [],

          matchData: {}  
      }
  }
  _onSetConfig(recordFirst, event){
      
      // 使用者選擇要用過去或是承諾
      // update match data
      // prepare party positiom
      const {records, issues, partyPromises} = this.props;
      let partyPositions = parseToPartyPosition(records, issues);
      let matchData = getPartiesMatchgameData(partyPositions, partyPromises, recordFirst);
      this.setState({
        progress: 'game',
        matchData: matchData
      })

      setTimeout(()=>{
         // Scroll to 1st question
        let target = document.getElementById("Question0");
        let targetPos = document.body.scrollTop + target.getBoundingClientRect().top;
    
        scrollTo(document.body, targetPos, 120);

      }, 50)
  }
  _recordUserChoice(issueName, order, choice) {
      //console.log("record user choice:"+issueName+"-"+choice)
      let currentChoices = this.state.userChoices;

      // if(currentChoices[issueName]){
      //    return;//如果已經回答過，不再重複登記
      // }

      if(this.state.completed === false){// 開始作答了
        this.setState({
          completed: true
        })
      }
      currentChoices[issueName] = choice;

      this.setState({
          userChoices: currentChoices
      });

      const {showRank} = this.state;

      if(showRank){//如果已經算答案，重新計算
         this._onShowMatchResult();
      }
  }
  _unlockNext(){
      this.setState({
          currentQAItemIndex: this.state.currentQAItemIndex+1
      });
  }
  _onShowMatchResult(){
    //console.log("i'm in charge. i'll take care of that. -by MatchGame")
    
    // 計算 rank
    let currentRank = [];
    let {matchData, userChoices} = this.state;

    Object.keys(matchData).map((partyId, index)=>{
        let points = 0;
        let samePositionCount = 0;
        let currentParty = matchData[partyId].positions;

        Object.keys(currentParty).map((issueName,k)=>{
            // 如果立場相同，並且使用者選擇的不是「沒意見」，加一分
            if((userChoices[issueName] === currentParty[issueName])&&(userChoices[issueName]!=="none")){
                points++;
                samePositionCount++;
            }  
            // 如果立場相反，扣一分
            if(
                (userChoices[issueName] === "aye" && currentParty[issueName] === "nay")||
                (userChoices[issueName] === "nay" && currentParty[issueName] === "aye")
               ){
                points--;
            }
            
        });

        currentRank.push(
          Object.assign(currentParty, {
            id: partyId,
            points: points
          })
        ) 

    })
   
    currentRank.sort((a,b)=>{
      if(b.points === a.points){
        return b.samePositionCount - a.samePositionCount;

      }else{
        return b.points - a.points;
      }
    })
    this.setState({
      progress: 'result',
      currentRank: currentRank
    });
  }
  _replay(){
    //console.log("*replay")
    this.setState({
        currentQAItemIndex: 0,
        userChoices: {},
        progress: 'config',
        completed: false
    })
    window.scrollTo(-100,0);
  }
  render() {
    const styles = require("./PartiesMatchGame.scss")
    const {issues} = this.props;
    let {qaSet, currentQAItemIndex, userChoices, showAnswerSection, 
         currentRank, progress, completed, 
         matchData} = this.state;

    let qaItems = qaSet.map((value,index)=>{
        return <QAItem key={`qaitem${index}`}
                       data={value}
                       currentQAItemIndex={currentQAItemIndex}
                       userChoices={userChoices}
                       recordHandler={this._recordUserChoice.bind(this)}
                       matchData={matchData}
                       maxIndex={qaSet.length-1}
                       unlockNext={this._unlockNext.bind(this)}
                       onShowMatchResult={this._onShowMatchResult.bind(this)}
                       completed={completed} />
    })

    // 配對結果
    let BottomSection;

    switch(progress){
      case 'config':
        return (
            <div className={styles.wrap}>
                <ConfigSection onSetConfig={this._onSetConfig.bind(this)} />
            </div>
        )
        
      break;

      case 'game':
        return (
            <div className={styles.wrap}>
                <ConfigSection onSetConfig={this._onSetConfig.bind(this)} />
                {qaItems}
            </div>
        )
      break;

      case 'result':
        return (
            <div className={styles.wrap}>
                <ConfigSection onSetConfig={this._onSetConfig.bind(this)} />
                {qaItems}
                <ResultSection currentRank={currentRank}
                               userChoices={userChoices}
                               replay={this._replay.bind(this)} />
            </div>
        )
      break;

    }
    
    return (//default
        <div></div>
    );
  }
}

class ConfigSection extends Component {
    componentDidMount(){
      // default set to 以過去紀錄為準
      this.refs.recordFirst.getDOMNode().checked = true;
    }
    _onClick(){
      const {onSetConfig} = this.props;
      let recordFirst = this.refs.recordFirst.getDOMNode().checked;
      onSetConfig(recordFirst);
    }
    render(){
      const styles = require("./PartiesMatchGame.scss")
      const {onSetConfig} = this.props;
      return (
        <div>
          <section className={styles.configSection}>
              如果過去四年的立法院紀錄和政黨目前的承諾不同⋯⋯
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <label className={styles.radioLabel}>
                    <input type="radio" className={styles.radio} name="conflictResolver" value="recordFirst" ref="recordFirst" />
                      我選擇以紀錄為準
                  </label>
                </li>
                <li className={styles.listItem}>
                  <label className={styles.radioLabel}>
                    <input type="radio" className={styles.radio} name="conflictResolver" value="promiseFirst" />
                      我選擇以承諾為準
                  </label>
                </li> 
              </ul>
              
          </section>

          <div className={styles.actionButtons}>
              <div onClick={this._onClick.bind(this)}
                  className={styles.actionButton}>繼續</div>
          </div>
      </div>
      )
    }
}

@connect(
    state => ({
      parties: state.parties
    }),
    dispatch => bindActionCreators({}, dispatch))
class ResultSection extends Component {

  render(){
    const styles = require("./PartiesMatchGame.scss")
    const {parties, currentRank, userChoices, replay} = this.props;

    let resultPKers = {};
    //依照分數排
    currentRank.map((party,index)=>{
        let point = party.points;
        if(!resultPKers[point]){
          resultPKers[point] = [];
        }
        resultPKers[point].push(party)
       
    })
    
    let array = [];
    for(let i=-4;i<=4;i++){
      array.push(i);
    }
    
    let resultSpectrum = array.map((i,index)=>{
        let hue = (resultPKers[i] || []).map((v,j)=>{
          return (
              <div className={styles.hueItem}
                   key={`${i}-${j}`}>
                  <PKer id={v.id} />
              </div>
          )
        })
        let hueClasses = classnames({
          [styles.hue]: true,
          [styles.empty] : !resultPKers[i]
        })
        return (
            <div className={hueClasses}>
                <div className={styles.huePoint}>{i}</div>
                {hue}
            </div>
        );
    })
  
    return (
      <div id="rankResultSection"
           className={styles.rankResultSection}>
          <div className={`${styles.positionTitle} ${styles.right}`}>與你立場最相同</div>
          <div className={`${styles.positionTitle} ${styles.left}`}>與你立場最不同</div>
          <div className={styles.spectrum}>{resultSpectrum}</div>
         
          <div className={styles.actionButtons}>
              <div onClick={replay.bind(null)}
                   className={styles.actionButton}>再玩一次</div>
          </div>
      </div>
    )
  }
}