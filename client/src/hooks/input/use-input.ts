import { ChangeEvent, useReducer } from "react";
import { Action } from "../../shared/utils/action.interface";
import { InputActionsType, inputActions } from "./models/inputActions";
import { InputState } from "./models/inputState.inferface";
import { ValidatorFn } from "../../shared/utils/validation/models/Validatorfn";

const initialInputState: InputState = {
  text: "",
  hasBeenTouched: false,
};

const inputReducer = (
  state: InputState,
  action: Action<InputActionsType>
): InputState => {
  const { type, value } = action;

  switch (type) {
    case inputActions.CHANGE:
      return { text: value || "", hasBeenTouched: state.hasBeenTouched };
    case inputActions.BLUR:
      return { text: state.text || "", hasBeenTouched: true };
    case inputActions.CLEAR:
      return { text: "", hasBeenTouched: false };
    default:
      return state;
  }
};

const useInput = (ValidatorFn?: ValidatorFn) => {
  const [{ text, hasBeenTouched }, dispatch] = useReducer(
    inputReducer,
    initialInputState
  );

  let shouldDisplayError;

  if (ValidatorFn) {
    const isValid = ValidatorFn(text);
    shouldDisplayError = !isValid && hasBeenTouched;
  }

  const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: inputActions.CHANGE, value: e.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: inputActions.BLUR });
  };
  const clearHandler = () => {
    dispatch({ type: inputActions.CLEAR });
  };

  return {
    text,
    shouldDisplayError,
    textChangeHandler,
    inputBlurHandler,
    clearHandler,
  };
  // Rest of your code
};

export default useInput;
