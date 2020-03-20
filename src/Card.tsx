import React from 'react';
import './Card.css';
import ProgressBar from "react-bootstrap/ProgressBar";
import {CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import Nutrients from './App';

type MacroBarProps = {
    percentageValue: number
    macroType: string
}

type EnergyValue = {
    kcalValue: number
    maxkcalVal: number
}

class MacroDetails extends React.Component<MacroBarProps, {}> {
    constructor(props: MacroBarProps) {
        super(props)
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="macro-details col-md-4">
                <p>{this.props.macroType}</p>
                <MacroBar percentageValue={this.props.percentageValue} macroType={this.props.macroType}/>
                <span>{this.props.percentageValue} g/ 100 g</span>
            </div>
        );
    }
}

class MacroBar extends React.Component<MacroBarProps, {}> {
    constructor(props: MacroBarProps) {
        super(props)
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="progressbar">
                <ProgressBar striped variant="success" now={this.props.percentageValue}/>
            </div>
        );
    }
}

class EnergyCircle extends React.Component<EnergyValue, {}> {
    constructor(props: EnergyValue) {
        super(props)
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <CircularProgressbar
                value={this.props.kcalValue / this.props.maxkcalVal}
                maxValue={1}
                text={`${this.props.kcalValue}/${this.props.maxkcalVal} kcal`}
                styles={{
                    text: {
                        fontSize: '12px',
                        fill: `rgb(51, 199, 30)`
                    },
                    path: {
                        stroke: `rgb(51, 199, 30)`
                    }
                }}
            />
        );
    }
}

class Card extends React.Component<any, {}> {
    state = {weight: this.props.weight};
    removeCard = (event: any) => {
        event.preventDefault();
        this.props.onRemove(this.props.id);
    };
    editFruitWeight = (event: any) => {
        this.setState({weight: event.target.value});
        this.props.onEditWeight(this.props.id, event.target.value)
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        console.log(this.props);
        return (
            <div className="card  border-success fruitCard col-md-6 offset-md-3">
                <h2 className="capitalize">{this.props.name}</h2>
                <div className="container-fluid">
                    <div className="row justify-content-md-center">
                        <div className="col-md-3">
                            <EnergyCircle kcalValue={this.props.Energy} maxkcalVal={2000}/>
                        </div>
                    </div>
                    <div>
                        <input
                            type="number"
                            value={this.state.weight}
                            onChange={this.editFruitWeight}/> <span>g</span>
                    </div>
                    <br/>
                    <div className="row">
                        <MacroDetails percentageValue={this.props.Fat} macroType={"Fat"}/>
                        <MacroDetails percentageValue={this.props.Protein} macroType={"Protein"}/>
                        <MacroDetails percentageValue={this.props.Carbs} macroType={"Carbs"}/>
                    </div>

                </div>
                <button onClick={this.removeCard}>remove</button>
            </div>
        );
    }
}


export default Card;