import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface LoadingIndicatorProps {
  children?: JSX.Element;
  promise: Promise<any> | undefined;
}

export default function LoadingIndicator(props: LoadingIndicatorProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setIsCompleted(false);
  }, [props.promise]);

  const renderLoadingIndicator = () => {
    const loadingIndicator = (
      <div className="d-flex justify-content-center mt-4">
        <FontAwesomeIcon icon={faSpinner} spin={true} color="black" size="2x" />
      </div>
    );
    return loadingIndicator;
  };

  if (props.promise) {
    props.promise.then(() => {
      setIsCompleted(true);
    });
    return <div style={{ width: "100%" }}>{isCompleted ? props.children : renderLoadingIndicator()}</div>;
  }
  return <div>{props.children}</div>;
}
