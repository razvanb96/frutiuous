import React from 'react';
import './Card.css';

const ProgressBar = require('react-progressbar.js');
let Circle = ProgressBar.Circle;


type MacroBarProps = {
    percentageValue: number
    macroType: string
}

function MacroDetails(props: MacroBarProps) {
    return (
        <div className="macro-details col-md-4">
            <p>{props.macroType}</p>
            <MacroBar percentageValue={props.percentageValue} macroType={props.macroType}/>
            <span>{props.percentageValue} g/ 100 g</span>
        </div>
    );
}

function MacroBar(props: MacroBarProps) {
    var options = {
        strokeWidth: 2
    };

    // For demo purposes so the container has some dimensions.
    // Otherwise progress bar won't be shown
    var containerStyle = {
        width: '200px',
        height: '200px'
    };
    return (
        <div className="progressbar">
            <Circle
                progress={props.percentageValue/100}
                text={'test'}
                options={options}
                initialAnimate={true}
                containerStyle={containerStyle}
                containerClassName={'.progressbar'}
            />
        </div>
    );
}

function Card() {
    return (
        <div className="row">
            <MacroDetails percentageValue={58} macroType={"Fat"}/>
            <MacroDetails percentageValue={11} macroType={"Protein"}/>
            <MacroDetails percentageValue={78} macroType={"Carbs"}/>
            <div>
                <div id="circleProgressBar"></div>
            </div>
        </div>
    );
}

export default Card;