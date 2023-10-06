import { useParams, useNavigate } from "react-router-dom";
import { useState } from 'react';

const validateInput = (key, val) => {
    switch (key) {
        case 'title':
            return val.length === 0 ? 'Title is required' : '';
        case 'meets':
            return val.length === 0 ? 'Title is required' : '';
        default:
            return '';
    }
};

const InputField = ({ name, text, state, change }) => (
    <div className="mb-3">
        <label htmlFor={name} className="form-label">{text}</label>
        <input className="form-control" id={name} name={name}
            defaultValue={state.values?.[name]} onChange={change} />
        <div className="invalid-feedback">{state.errors?.[name]}</div>
    </div>
);

const ButtonBar = ({ message, disabled }) => {
    const navigate = useNavigate();
    return (
        <div className="d-flex">
            <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate("/")}>Cancel</button>
            <button type="submit" className="btn btn-primary me-auto" disabled={true} onClick={() => onSubmit()}>Submit</button>
            <span className="p-2">{message}</span>
        </div>
    );
};

const useFormData = (validator = null, values = {}) => {
    const [state, setState] = useState(() => ({ values }));

    const change = (evt) => {
        const { id, value } = evt.target;
        const error = validator ? validator(id, value) : '';
        // evt.target.setCustomValidity(error);

        const values = { ...state.values, [id]: value };
        const errors = { ...state.errors, [id]: error };
        const hasError = Object.values(errors).some(x => x !== '');
        setState(hasError ? { values, errors } : { values });
    };

    return [state, change];
};

const onSubmit = () => {
    return null;
};


const CourseForm = () => {
    const { course } = useParams();
    const [title, meets] = course.split('|');

    const [state, change] = useFormData(validateInput, {
        title: title,
        meets: meets,
    });

    return (
        <form noValidate className={state.errors ? 'was-validated' : null}>
            <InputField name="title" text="Title" state={state} change={change} />
            <InputField name="meets" text="Meeting Time" state={state} change={change} />
            <ButtonBar />
        </form>
    );
};

export default CourseForm;