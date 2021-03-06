import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const ingredientPrices = {
	salad: 0.5,
	bacon: 2,
	cheese: 1,
	meat: 1.3
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map(igKeys => {
				return ingredients[igKeys];
			})
			.reduce((sum, cur) => sum += cur, 0);
		this.setState({purchasable: sum > 0})
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = ingredientPrices[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState ({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState (updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = ingredientPrices[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState ({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState (updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	};

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	};

	purchaseContinueHandler = () => {
		alert ("You are continue!");
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return(
			<Aux>
				<Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
					<OrderSummary 
						purchaseCancelled = {this.purchaseCancelHandler}
						purchaseContinued = {this.purchaseContinueHandler}
						ingredients = {this.state.ingredients}
						price = {this.state.totalPrice} />
				</Modal>
				<Burger ingredients = {this.state.ingredients}/>
				<BuildControls 
					ingredientAdded = {this.addIngredientHandler}
					ingredientRemoved = {this.removeIngredientHandler} 
					disabled = {disabledInfo}
					price={this.state.totalPrice}
					purchasable = {this.state.purchasable}
					ordered = {this.purchaseHandler} />
			</Aux>
		);		
	}
};

export default BurgerBuilder;