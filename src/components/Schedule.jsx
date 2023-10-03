import './Schedule.css';

// https://codebuckets.com/2021/08/08/bootstrap-modal-dialog-in-react-without-jquery/

const Schedule = ({ children, open, close }) => (
    <div
        className={`${open ? 'modal-show' : 'modal'}`}
        tabIndex="-1"
        role="dialog"
        onClick={(evt) => { if (evt.target === evt.currentTarget) close(); }}
    >
        <div className="modal-dialog inner" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="btn-close mx-3" aria-label="Close"
                        onClick={close}
                    />
                </div>
                <div className="modal-body overflow-scroll">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

export default Schedule;