import './TermSelector.css';

const TermSelector = ({ selection, setSelection, }) => (
    <div className="button-group"  >
        <input type="radio" className="btn-check" name="btnradio" id="fall"
            autoComplete="off" defaultChecked={selection == "Fall"} onClick={() => setSelection("Fall")}
        />
        <label className="btn btn-outline-primary" htmlFor="fall">Fall</label>

        <input type="radio" className="btn-check" name="btnradio" id="winter"
            autoComplete="off" defaultChecked={selection == "Winter"} onClick={() => setSelection("Winter")}
        />
        <label className="btn btn-outline-primary" htmlFor="winter">Winter</label>

        <input type="radio" className="btn-check" name="btnradio" id="spring"
            autoComplete="off" defaultChecked={selection == "Spring"} onClick={() => setSelection("Spring")}
        />
        <label className="btn btn-outline-primary" htmlFor="spring">Spring</label>
    </div>
);


export default TermSelector;
