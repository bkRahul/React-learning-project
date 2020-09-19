import React from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  return (
    <Aux>
      <Backdrop show={props.show} modalClosed={props.clicked} />
      <div
        className={classes.Modal}
        style={
          props.show
            ? { transform: 'translateY(0)', opacity: '1' }
            : { transform: 'translateY(-100vh)', opacity: '0' }
        }
      >
        {props.children}
      </div>
    </Aux>
  );
};

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

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.childen
);
