export default function HistoryModal({ history, close }) {
  const formatSummary = (summary) => {
    return summary
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, index) => {
        const cleanLine = line.replace(/\*\*/g, "");

        if (cleanLine.startsWith("-")) {
          return (
            <div key={index} className="summary-bullet">
              {cleanLine.replace("-", "").trim()}
            </div>
          );
        }

        return (
          <div key={index} className="summary-text">
            {cleanLine}
          </div>
        );
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Last 5 Checks</h3>

        {history.map((h) => (
          <div key={h.id} className="history-item">

            <div className="history-header">
              <div>
                <strong>
                  {new Date(h.created_at).toLocaleString()}
                </strong>
              </div>

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

            <div className="summary-section">
              {formatSummary(h.summary)}
            </div>

          </div>
        ))}

        <button className="primary" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
}
