import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "React";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

//connect enzyme
configure({ adapter: new Adapter() });

describe("<BurgerBuilder/>", () => {
  let wrapper;

  //runs before each test
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} /> );
  });

  it("should render <BuildControls/> when received ingredients", () => {
    wrapper.setProps({ ings: {salad: 1} });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });

});
