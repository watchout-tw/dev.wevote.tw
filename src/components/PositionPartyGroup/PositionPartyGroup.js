import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment';

import eng2party_short from '../../utils/eng2party_short';
import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';
import party2color from '../../utils/party2color';
import rectInCircleLayoutWrap from '../../utils/rectInCircleLayoutWrap';
import rectInCircleLayoutSVG from '../../utils/rectInCircleLayoutSVG';

class Record extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  constructor(props){super(props)
    this.state = {
      active: false
    }
  }
  _toggleActive(value, event){
    this.setState({
      active: value
    })
  }

  render() {
    const styles = require('./PositionPartyGroup.scss');
    const {data} = this.props;
    const {active} = this.state;

    let date = moment.unix(data.date);
    let cubeActiveStyle = "";

    //是否為黨團
    let isCaucus = (data.legislator.indexOf("黨團")!== -1);
    let caucusStyle = isCaucus ? styles.caucus : "";

    if(active)
       cubeActiveStyle = styles.positionCubeActive;

    /* active record */
    let detailText;
    if(active){
          let date = moment.unix(data.date);

          let preview = (data.content.length > 40) ? data.content.slice(0,40)+"..." : data.content;
          detailText =  (
          <div className={styles.activeBlock}>

              <Link to={`/records/${data.id}`} className={styles.activeCube}>
                  <div className={styles.activeContent}>
                    <div>{date.format('YYYY-MM-DD')} / {data.legislator} / {data.meetingCategory}</div>
                    <div>{preview}</div>
                  </div>
              </Link>
          </div>);
    }

    return (
      <div className={styles.positionWrap}>

          {detailText}

          <Link to={`/records/${data.id}`}
                className={` ${styles.positionCube} ${cubeActiveStyle} ${styles[data.party]} ${caucusStyle} `}
                onMouseEnter={this._toggleActive.bind(this, true)}
                onMouseLeave={this._toggleActive.bind(this, false)} >
          </Link>

      </div>
    )
  }

  props = {
    className: ''
  }
}


export default class PositionPartyGroup extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    issueStatement: PropTypes.string.isRequired

  }

  constructor(props){ super(props)
    this.state = {
       viewWidth: ""
    }
  }
  _updateViewWidth(){
    if(window){
        this.setState({
           viewWidth: window.innerWidth
        })
    }
    this._playD3();
  }
  _playD3(){
    
    const { data, maxCount, issueURL, parties } = this.props;
    const styles = require('./PositionPartyGroup.scss');
    
    let viewWidth = window.innerWidth;
    if(this.state.viewWidth){
      viewWidth = this.state.viewWidth;
    }
    const layoutStyles = rectInCircleLayoutSVG(
      viewWidth,
      20,
      data.records.length,
      maxCount
    );

    let width = layoutStyles.width,
        height = layoutStyles.height,
        radius = Math.min(width, height) / 2;
    
    let arc = d3.svg.arc()
                .outerRadius(radius)
                .innerRadius(radius - layoutStyles.borderWidth);
    
    let pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.percentage; });
    
    let node = d3.select(`#svgContainer-${issueURL}-${data.position}`);
    
    node.selectAll("*")
        .remove();

    let svg = node
                .attr("width", width)
                .attr("height", height)
              .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let dataset = data.partyPercentages.map((value,index)=>{
        return {
            party: value.party,
            percentage: value.percentage
        }
    });
   
    let g = svg.selectAll(".arc")
               .data(pie(dataset))
               .enter()
               .append("g")
               .attr("class", "arc")

        g.append("path")
         .attr("d", arc)
         .style("fill", function(d) { return party2color(d.data.party); });
  }
  componentDidMount(){
    this._updateViewWidth();
    window.addEventListener('resize', this._updateViewWidth.bind(this));
    this._playD3();
  }
  componentDidUpdate(){
    this._playD3();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this._updateViewWidth.bind(this));
  }
  render() {
    const styles = require('./PositionPartyGroup.scss');
    const {data, maxCount, issueURL, issueStatement, userPosition} = this.props;
    const {parties} = this.props;

     // 處理在這個立場，政黨表態的比例
    let positionPercentageItem;
    let reverseArray = [];
    for(let i = data.partyPercentages.length-1; i>=0; i--){
        reverseArray.push(data.partyPercentages[i])
    }

    positionPercentageItem = reverseArray.map((value, index)=>{
      return <div className={styles.metaTitle}
                  key={`${eng2cht(value.party)} ${value.percentage}-${index}`}>
                  {`${eng2party_short(value.party)} ${value.percentage}%`}
             </div>
    })


    let title = `我${eng2cht(data.position)}${issueStatement}`;
    if(data.position === "unknown")
      title = "我立場模糊";

    let records = data.records.map((item,index)=>{
      return <Record data={item}
                     key={index} />
    });

    const layoutStyles = rectInCircleLayoutWrap(
      this.state.viewWidth,
      20,
      data.records.length,
      maxCount
    );

    let userPositionItem;
    if(data.position === userPosition){
       userPositionItem = 
        <div className={styles.userPositionBlock}>
            <div className={styles.userPositionText}>與你立場相同</div> 
        </div>
    }

    return (
      <div className={styles.wrap}>
        {userPositionItem}
        <div className={styles.header}>
          {title}
          <div>{positionPercentageItem}</div>
        </div>
        
        <div style={layoutStyles.wrap}>
            <svg id={`svgContainer-${issueURL}-${data.position}`}
                 className={styles.svgWrap} />
            <div style={layoutStyles.rect}
                 className={styles.rectWrap}>{records}</div>
        </div>
      </div>
    );
  }

  props = {
    className: ''
  }
}
