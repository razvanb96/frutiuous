import React from "react";
import './Stats.css'
import {CircularProgressbar} from "react-circular-progressbar";
import {Nutrients} from "./App";

class Stats extends React.Component<any, any> {
    private getTotalEnergy(fruits: Array<Nutrients>): number {
        let energy: number = 0;
        fruits.forEach((fruit: Nutrients) => {
            energy += fruit.Energy * fruit.weight / 100
        });
        return Math.round(energy * 100) / 100;
    }

    private getTotalCarbs(fruits: Array<Nutrients>): number {
        let carbs: number = 0;
        fruits.forEach((fruit: Nutrients) => {
            carbs += fruit.Carbs * fruit.weight / 100
        });
        return Math.round(carbs * 100) / 100;
    }

    private getTotalFat(fruits: Array<Nutrients>): number {
        let fat: number = 0;
        fruits.forEach((fruit: Nutrients) => {
            fat += fruit.Fat * fruit.weight / 100
        });
        return Math.round(fat * 100) / 100;
    }

    private getTotalProteins(fruits: Array<Nutrients>): number {
        let proteins: number = 0;
        fruits.forEach((fruit: Nutrients) => {
            proteins += fruit.Protein * fruit.weight / 100
        });
        return Math.round(proteins * 100) / 100;
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div>
                <CircularProgressbar className="nav-item stats-circle-progressbar"
                                     value={this.getTotalEnergy(this.props.fruits)}
                                     maxValue={2000}
                />
                <span>{this.getTotalEnergy(this.props.fruits)} kcal / 2000 kcal</span>
                <CircularProgressbar className="nav-item stats-circle-progressbar"
                                     value={this.getTotalFat(this.props.fruits)}
                                     maxValue={70}
                />
                <span>{this.getTotalFat(this.props.fruits)}g / 70 g Fat</span>
                <CircularProgressbar className="nav-item stats-circle-progressbar"
                                     value={this.getTotalProteins(this.props.fruits)}
                                     maxValue={50}
                />
                <span>{this.getTotalProteins(this.props.fruits)} g / 50 g Proteins</span>
                <CircularProgressbar className="nav-item stats-circle-progressbar"
                                     value={this.getTotalCarbs(this.props.fruits)}
                                     maxValue={260}
                />
                <span>{this.getTotalCarbs(this.props.fruits)} g / 260 g Carbohydrates</span>
            </div>
        )
    }
}

export default Stats