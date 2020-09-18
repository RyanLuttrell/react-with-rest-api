import React from 'react';

export default (props) => {

//Deconstruct the props for easier use
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;
  
//Primarily a helper function to prevent the default action when a form is submitted
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

//Primarily a helper function to prevent the default action when a form is cancelled
  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

//Primarily a helper function to display the validation errors to the user when a form is not filled in correctly
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}