import styles from "./app.module.css";
import React from "react";
import IconScreenDivider from "./components/iconScreenDivider/iconScreenDivider";
import IndexPage from "./pages/index";
import throttle from "./utils/throttle";
import { useRef, useEffect, useReducer } from "react";

const constants = {
  setIsShowIconScreenDivider: "setIsShowIconScreenDivider",
  setTop: "setTop",
  setLeft: "setLeft",
  setRange: "setRange",
  setDelay: "setDelay",
  setIsMouseDown: "setIsMouseDown",
};

const initialState = {
  isShowIconScreenDivider: false,
  top: 0,
  left: 0,
  range: [-2, 4],
  delay: 30,
  isMouseDown: false,
};

function reducer(state, action) {
  switch (action.type) {
    case constants.setIsShowIconScreenDivider:
      return { ...state, isShowIconScreenDivider: action.payload };
    case constants.setTop:
      return { ...state, top: action.payload };
    case constants.setLeft:
      return { ...state, left: action.payload };
    case constants.setRange:
      return { ...state, range: action.payload };
    case constants.setDelay:
      return { ...state, delay: action.payload };
    case constants.setIsMouseDown:
      return { ...state, isMouseDown: action.payload };
    default:
      throw new Error();
  }
}

function App() {
  const refApp = useRef(null);
  const refIconScreenDivider = useRef(null);
  const refOrders = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.isShowIconScreenDivider) {
      refIconScreenDivider.current.style.opacity = 1;
      refIconScreenDivider.current.style.top = `${state.top - 15}px`;
      refIconScreenDivider.current.style.left = `${state.left - 15}px`;
      refApp.current.style.cursor = "none";
    } else {
      refIconScreenDivider.current.style.opacity = 0;
      refApp.current.style.cursor = "auto";
    }
  }, [state.isShowIconScreenDivider, state.left, state.top]);

  useEffect(() => {
    if (state.isMouseDown)
      refOrders.current.style.width = `${state.left + 1}px`;
  }, [state.isMouseDown, state.left]);

  function handleMouseMoveApp(evt) {
    if (
      evt.clientX - refOrders.current.clientWidth > state.range[0] &&
      evt.clientX - refOrders.current.clientWidth < state.range[1]
    ) {
      dispatch({ type: constants.setIsShowIconScreenDivider, payload: true });
      dispatch({ type: constants.setTop, payload: evt.clientY });
      dispatch({ type: constants.setLeft, payload: evt.clientX });
    } else {
      dispatch({ type: constants.setIsShowIconScreenDivider, payload: false });
    }
  }

  const optimizedHandleMouseMoveApp = throttle(handleMouseMoveApp, state.delay);

  function handleMouseDownApp() {
    if (state.isShowIconScreenDivider) {
      dispatch({ type: constants.setIsMouseDown, payload: true });
      dispatch({ type: constants.setRange, payload: [-92, 94] });
      dispatch({ type: constants.setDelay, payload: 0 });
    }
  }

  function handleMouseUpApp() {
    dispatch({ type: constants.setIsMouseDown, payload: false });
    dispatch({ type: constants.setRange, payload: [-2, 4] });
    dispatch({ type: constants.setDelay, payload: 30 });
  }

  return (
    <div
      ref={refApp}
      className={styles.container}
      onMouseMove={optimizedHandleMouseMoveApp}
      onMouseDown={handleMouseDownApp}
      onMouseUp={handleMouseUpApp}
    >
      <IconScreenDivider ref={refIconScreenDivider} />
      <IndexPage ref={refOrders} />
    </div>
  );
}

export default App;
