import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';

import Appbar from '../../components/Appbar/Appbar.js';
import Footer from '../../components/Footer/Footer.js';
import Social from '../../components/Social/Social.js';

export default class Shell extends Component {
  render() {
    const {params} = this.props;
    const styles = require('./Shell.scss');
    return (
      <div>
        <div className={styles.spaceBar}></div>
         {this.props.children}
        <Footer/>
        <Social />
        <Appbar params={params}/>
      </div>
    );
  }




}
