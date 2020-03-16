import React from 'react';
import './App.css';
import Card from "./Card";
import SearchBar from "./SearchBar"
import Stats from "./Stats"

class CardList extends React.Component<{ fruits: Array<Nutrients>, onRemove: any, onEditWeight: any }, any> {
    constructor(props: any) {
        super(props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        console.log(this.props.fruits);
        return <div className="container-fluid">
            {this.props.fruits.map(fruit => {
                return <Card key={fruit.id} {...fruit} onRemove={this.props.onRemove} onEditWeight={this.props.onEditWeight}/>;
            })}
        </div>;
    };
}

export class Nutrients {
    id: string;
    Energy: number;
    Fat: number;
    Carbs: number;
    Protein: number;
    name: string;
    weight: number;

    public constructor(jsonString: string, fruitName: string) {
        let json = JSON.parse(jsonString)[0].food;
        this.Energy = json.nutrients["ENERC_KCAL"];
        this.Fat = json.nutrients["FAT"];
        this.Carbs = json.nutrients["CHOCDF"];
        this.Protein = json.nutrients["PROCNT"];
        this.id = json.foodId;
        this.name = fruitName;
        this.weight = 100;
    }

}

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            fruits: [],
        }
    }

    addNewFruit = (fruitDetails: Nutrients) => {
        if (this.state.fruits.filter((fruit: Nutrients) => fruit.id === fruitDetails.id).length === 0) {
            this.setState((prevState: { fruits: any; stats: Nutrients }) => ({
                fruits: [...prevState.fruits, fruitDetails],
            }))
        }
    };

    removeFruit = (fruitIdToRemove: string) => {
        this.setState((prevState: { fruits: any; stats: Nutrients }) => ({fruits: prevState.fruits.filter((fruit: Nutrients) => fruit.id !== fruitIdToRemove)}));
    };
    editFruitWeight = (fruitIdToEdit: string, weight: number) => {
        function changeFruitInArray(fruits: Array<Nutrients>, fruitIdToEdit: string, weight: number) {
            fruits.forEach((fruit: Nutrients) => {
                if (fruit.id === fruitIdToEdit) {
                    fruit.weight = weight
                }
            });
            return fruits;
        }

        this.setState((prevState: { fruits: any }) => ({fruits: changeFruitInArray(prevState.fruits, fruitIdToEdit, weight)}))
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="App">
                <nav className="navbar navbar-inverse navbar-fixed-top">
                        <Stats fruits={this.state.fruits}/>
                        <SearchBar onSubmit={this.addNewFruit}/>
                </nav>
                <CardList fruits={this.state.fruits} onRemove={this.removeFruit} onEditWeight={this.editFruitWeight}/>
            </div>
        );
    }
}

export default App;
