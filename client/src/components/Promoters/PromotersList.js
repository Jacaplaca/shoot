import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
// import man from '../../public'

class PromotersList extends Component {
  render() {
    const { classes, promoters, auth, promotersArr } = this.props;
    console.log("promoter", promoters);
    console.log("promoterArr", promotersArr);
    console.log("user", auth);
    return (
      // <div style={{ overflow: "scroll", height: "400px" }}>
      <div>
        <h1>adfdf</h1>
        {promotersArr.length > 0 &&
          promotersArr.map(promoter => (
            <div key={promoter.email}>
              {promoter.name}
              <img style={{ width: 80 }} src={require(`../${promoter.logo}`)} />
            </div>
          ))}
      </div>
    );
  }
}

const styles = {};

function mapStateToProps({ auth, promoters }) {
  return { promotersArr: promoters };
}

// export default compose(
//   withStyles(styles, { withTheme: true }),
//   // MainFrameHOC
//   mapStateToProps
// )(PromotersList);

export default connect(
  mapStateToProps
  // actions
)(PromotersList);
