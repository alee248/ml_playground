import React from 'react'

export default function ModelCard(props) {

    const model = props.model

    return (
        <>
            <div className="model-pg-head">Description</div>
            <div className="model-pg-text">
                {model.Details}
            </div>
            <div className="model-pg-head" hidden={model.IntendedUse ? false : true}>Intended Use</div>
            <div className="model-pg-text" hidden={model.IntendedUse ? false : true}>
                {model.IntendedUse}
            </div>
            <div className="model-pg-head" hidden={model.Factors ? false : true}>Factors</div>
            <div className="model-pg-text" hidden={model.Factors ? false : true}>
                {model.Factors}
            </div>
            <div className="model-pg-head" hidden={model.TrainingData ? false : true}>Training Data</div>
            <div className="model-pg-text" hidden={model.TrainingData ? false : true}>
                {model.TrainingData}
            </div>
            <div className="model-pg-head" hidden={model.EvalData ? false : true}>Evaluation Data</div>
            <div className="model-pg-text" hidden={model.EvalData ? false : true}>
                {model.EvalData}
            </div>
            <div className="model-pg-head" hidden={model.EthicalConsid ? false : true}>Ethical Considerations</div>
            <div className="model-pg-text" hidden={model.EthicalConsid ? false : true}>
                {model.EthicalConsid}
            </div>
            <div className="model-pg-head" hidden={model.CaveatsRecs ? false : true}>Caveats and Recommendations</div>
            <div className="model-pg-text" hidden={model.CaveatsRecs ? false : true}>
                {model.CaveatsRecs}
            </div>
            <div className="model-pg-head" hidden={model.License ? false : true}>License</div>
            <div className="model-pg-text" hidden={model.License ? false : true}>
                {model.License}
            </div>
            <div className="model-pg-head">Used In</div>
            <div className="model-pg-text">

            </div>
        </>
    )
}