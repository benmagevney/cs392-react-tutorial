
const Button = ({ term, selection, setSelection }) => (
    <div>
        <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
            onChange={() => setSelection(term)} />
        <label className="btn btn-success mb-1 p-2" htmlFor={term}>
            {term}
        </label>
    </div>
);

const TermSelector = ({ selection, setSelection }) => (
    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
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
