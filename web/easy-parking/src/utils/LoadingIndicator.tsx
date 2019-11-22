import React, { useState, useEffect } from "react";
// import { Modal, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface LoadingIndicatorProps {
  children?: JSX.Element;
  promise: Promise<any> | undefined;
  // asModal?: boolean;
}

export default function LoadingIndicator(props: LoadingIndicatorProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setIsCompleted(false);
  }, [props.promise]);

  const renderLoadingIndicator = () => {
    const loadingIndicator = (
      <div className="d-flex justify-content-center">
        <FontAwesomeIcon icon={faSpinner} spin={true} color="white" size="2x" />
      </div>
    );
    // console.log(props.asModal);
    // if (props.asModal) {
    //   return (
    //     <Modal className="ui-bg-transparent" isOpen={!isCompleted}>
    //       <ModalBody>{loadingIndicator}</ModalBody>
    //     </Modal>
    //   );
    // }
    return loadingIndicator;
  };

  if (props.promise) {
    props.promise.then(
      () => {
        setIsCompleted(true);
      },
      () => {
        setIsCompleted(true);
      }
    );
    return <div>{isCompleted ? props.children : renderLoadingIndicator()}</div>;
  }
  return <div>{props.children}</div>;
}
