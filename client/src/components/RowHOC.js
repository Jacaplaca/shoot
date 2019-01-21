import React, { Component } from "react";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import MenuIcon from "@material-ui/icons/Menu";
import Search from "@material-ui/icons/Search";
import MenuContextTurnament from "../skins/MenuContextTurnament";

const RowRowHOC = WrappedComponent => {
  class RowRowHOC extends Component {
    state = {
      anchorEl: null
    };

    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
      // console.log("handluje closa na menu");
      this.setState({ anchorEl: null });
    };

    render() {
      const {
        row: { _id, finished },
        collection,
        classes,
        edit,
        editFetch,
        theme,
        toDeleteAction,
        auth: { user },
        grid
      } = this.props;
      const { anchorEl } = this.state;
      // console.log("RowRowHOC", this.props);
      // console.log("RowRowHOC", user);
      return (
        <React.Fragment>
          <div
            className={classNames(
              finished ? classes.rowFinished : classes.rowTable,
              classes.table
            )}
            style={{ gridTemplateColumns: grid }}
          >
            <span className={classNames(classes.rowBlock)}>
              {user.rola === "admin" || collection === "players" ? (
                <IconButton
                  style={{ padding: 5 }}
                  onClick={() => editFetch(collection, _id)}
                  color="primary"
                  aria-label="Add to shopping cart"
                >
                  <Edit
                    style={styles.button}
                    iconStyle={styles.icon}
                    tooltipStyles={styles.tooltip}
                  />
                </IconButton>
              ) : null}
            </span>
            <WrappedComponent {...this.props} />
            <span className={classNames(classes.rowBlock)}>
              {collection === "turnaments" ? (
                <IconButton
                  style={{ padding: 5 }}
                  color="primary"
                  aria-owns={anchorEl ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MenuIcon
                    style={styles.button}
                    iconStyle={styles.icon}
                    tooltipStyles={styles.tooltip}
                  />
                </IconButton>
              ) : (
                //   <IconButton
                //     aria-label="Delete"
                //     onClick={() => toDeleteAction(_id)}
                //   >
                //     <DeleteIcon />
                //   </IconButton>
                // ) : (
                //   <IconButton
                //     color="primary"
                //     aria-owns={anchorEl ? "simple-menu" : undefined}
                //     aria-haspopup="true"
                //     onClick={this.handleClick}
                //   >
                //     <MenuIcon />
                //   </IconButton>
                <IconButton
                  style={{ padding: 5 }}
                  aria-label="Delete"
                  onClick={() => toDeleteAction(_id)}
                >
                  <DeleteIcon
                    style={styles.button}
                    iconStyle={styles.icon}
                    tooltipStyles={styles.tooltip}
                  />
                </IconButton>
              )}
            </span>
          </div>
          <MenuContextTurnament
            user={user}
            deleteAction={id => {
              toDeleteAction(id);
              this.handleClose();
            }}
            turnamentId={_id}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            finished={finished}
          />
        </React.Fragment>
      );
    }
  }
  return RowRowHOC;
};

const styles = {
  button: {
    width: 18,
    height: 18,
    padding: 0
  },
  icon: {
    fontSize: 17,
    color: "#fffff"
  },
  tooltip: {
    marginLeft: 7
  }
};

export default RowRowHOC;
