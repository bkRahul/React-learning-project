import React, {Component} from "react";

import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxillary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.childen;
  }

// componentDidMount() {
//   console.log('[Modal] is mounted')
// }

  componentDidUpdate() {
    //console.log('[Modal] Updated');
  }

  render() {
    return (
    <Aux>
      <Backdrop show={this.props.show} modalClosed={this.props.clicked} />
      <div
        className={classes.Modal}
        style={
          this.props.show
            ? { transform: "translateY(0)", opacity: "1" }
            : { transform: "translateY(-100vh)", opacity: "0" }
        }
      >
        {this.props.children}
      </div>
    </Aux>
    )
  }
}


// const Modal = props => {
//   useEffect(() => {
//     console.log("[Modal.js] is rendered");
//   });

// // useEffect(() => {
// //   console.log("[Modal.js] is rendered");
// //   return () => {
// //     console.log("[Modal.js] cleanup");
// //   };
// // }, [])
  
//   return (
//     <Aux>
//       <Backdrop show={props.show} modalClosed={props.clicked} />
//       <div
//         className={classes.Modal}
//         style={
//           props.show
//             ? { transform: "translateY(0)", opacity: "1" }
//             : { transform: "translateY(-100vh)", opacity: "0" }
//         }
//       >
//         {props.children}
//       </div>
//     </Aux>
//   );
// };

export default Modal;