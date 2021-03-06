import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentMeta from 'react-document-meta';

import classnames from 'classnames';

import eng2party_short from '../../utils/eng2party_short';

/* Stage1: roll */
import PartyRolls from '../../components/PartyRolls/PartyRolls';
/* Stage2: matchgame */
import PartyMatchGame from '../../components/PartyMatchGame/PartyMatchGame';
/* Stage3: bill */
import BillTable from '../../components/BillTable/BillTable';

import Social from '../../components/Social/Social.js';

export default class PartiesGame extends Component {
  constructor(props){ super(props)
        this.state = {
             stage: "roll", /* roll, matchgame, bill */
             showBedge: false
        }
  }
  _onSetStage(value){
    window.scrollTo(0,0);
    this.setState({
      stage: value
    })
  }
  _onScroll(){
      const {focus, showBedge} = this.state;

      let badgeNode = document.getElementById("completeBadge");
      if(!badgeNode) return;
      let badgeRect = badgeNode.getBoundingClientRect();

      let current = false;
      if(badgeRect.top < window.innerHeight/3 ){
        current = true;
      }

      if(showBedge !== current){
          this.setState({
            showBedge: current
          })
      }
  }
  componentDidMount(){
      window.addEventListener("scroll", this._onScroll.bind(this));
  }
  componentWillUnmount(){
     window.removeEventListener("scroll", this._onScroll.bind(this));
  }
  render() {
    const styles = require('./PartiesGame.scss');
    const {stage, showBedge} = this.state;
    let missionAccomplishedImg = require('./images/MissionAccomplished-01.png');
    let content;
    switch(stage){
        case 'roll':
          content = <PartyRolls onSetStage={this._onSetStage.bind(this)}/>
        break;

        case 'matchgame':
          content = <PartyMatchGame onSetStage={this._onSetStage.bind(this)}/>
        break;

        case 'bill':
          let shareClasses = classnames({
            [styles.billCompleteShare] : true,
            [styles.show]: showBedge === true
          })
          content = (
              <div className={styles.billWrap}>
                  <BillTable unit="parties"/>
                  <div id="completeBadge"></div>
                  <div className={styles.billComplete}>
                      <img src={missionAccomplishedImg}/>
                  </div>
                  <Social />
              </div>
          )
        break;

    }
    const title = `政黨票投票攻略-各政黨議題表態配對遊戲-沃草2016立委出任務`;
    const description = `2016立委選舉「政黨票」怎麼投？想知道各政黨的不分區參戰名單嗎？想知道各政黨對於議題表態與優先法案的未來承諾嗎？快來進行政黨成分分析，配對最適合你的政黨，政黨票投票最佳攻略！`;
    const metaData = {
      title: title,
      description: description,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': title,
            'og:description': description,
            'og:type' : 'website'
          }
      }
    };

    return (
      <div>
          <DocumentMeta {...metaData}/>
          <div className={styles.wrap}>
            <ProgressBar stage={stage} />
            {content}
          </div>
          <div className={styles.bgHolder}></div>
      </div>
    );

  }
}
class ProgressBar extends Component {
    render(){
      const styles = require('./PartiesGame.scss');
      const {stage} = this.props;
      
      const allStages = [
      {
        "id":"roll",
        "title":"參戰名單"
      },
      {
        "id":"matchgame",
        "title":"成分分析"
      },
      {
        "id":"bill",
        "title":"戰鬥目標"
      }];
      let complete = true;
      let stageItems = allStages.map((s,i)=>{
          let current = false;
          if(s.id === stage){
             complete = false;
             current = true;
          }
          let sClasses = classnames({
            [styles.sItem] : true,
            [styles.complete] : complete === true,
            [styles.current] : current === true
          })
          let cClasses = classnames({
            [styles.circle] : true,
            [styles.complete] : complete === true,
            [styles.current] : current === true
          })
          return (
            <div className={sClasses}>
               <div className={cClasses}></div>
               {s.title}
            </div>
          )
      });
      return (
          <div className={styles.stageWrap}>
              {stageItems}
          </div>
      )
    }
}
