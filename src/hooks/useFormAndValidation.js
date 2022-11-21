import { useState, useCallback } from 'react';

export function useFormAndValidation(defaultValues) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isRepeatError, setIsRepeatError] = useState(false);

  const [isValidInputs, setIsValidInputs] = useState({});

  const handleChangeInput = (evt) => {
    const input = evt.target;
    const value = input.value;
    const name = input.name;
    const newValues = { ...values, [name]: value };
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(evt.target.closest('form').checkValidity());

    setIsValidInputs({ ...isValidInputs, [name]: input.checkValidity() });

    if(evt.target.closest('form').name === 'profileEditForm') {
      checkForRepeat(newValues);
    }
  };

  const checkForRepeat =(newValues) => {    
    let isRepeated = true;
    for (const key in newValues) {      
        if (
          newValues[key] !== defaultValues[key] ||
          defaultValues[key].length === 0
        ) {
          isRepeated = false;          
          break;
      }
    }
    
    if (isRepeated) {
      setIsValid(false);
      setIsRepeatError(true);     
    }
    else {
      setIsRepeatError(false);
      }
  }

  const resetFrom = useCallback(
    (newErrors = {}, newIsValid = false, newIsValidInputs = {}) => {
      setErrors(newErrors);
      setIsValid(newIsValid);
      setIsValidInputs(newIsValidInputs);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChangeInput,
    resetFrom,
    errors,
    isValid,
    isValidInputs,
    isRepeatError,
  };
}
