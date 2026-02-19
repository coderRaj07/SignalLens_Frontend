export default function HistoryModal({ history, close }) {
  const parseSummary = (summary) => {
    try {
      return JSON.parse(summary);
    } catch {
      return null;
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Last 5 Checks</h3>

        {history.map((h) => {
          const parsed = parseSummary(h.summary);

          return (
            <div key={h.id} className="history-item">

              <div className="history-header">
                <strong>
                  {new Date(h.created_at).toLocaleString()}
                </strong>

                <div>
                  <span className="change-percentage">
                    {h.change_percentage.toFixed(2)}%
                  </span>

                  {h.is_significant ? (
                    <span className="badge red">Significant</span>
                  ) : (
                    <span className="badge green">Minor</span>
                  )}
                </div>
              </div>

              {parsed ? (
                <div className="analysis-box">

                  {parsed.change_types?.length > 0 && (
                    <div className="change-types">
                      {parsed.change_types.map((type, i) => (
                        <span key={i} className="tag">
                          {type}
                        </span>
                      ))}
                    </div>
                  )}

                  <ul className="summary-list">
                    {parsed.summary.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>

                  <div className="confidence">
                    Confidence: {parsed.confidence}%
                  </div>

                </div>
              ) : (
                <div className="summary-text">
                  {h.summary}
                </div>
              )}

            </div>
          );
        })}

        <button className="primary" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
}
