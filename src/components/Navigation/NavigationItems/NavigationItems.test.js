import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "React";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

//connect enzyme
configure({ adapter: new Adapter() });

describe("<NavigationItems/>", () => {
  let wrapper;

  //runs before each test
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  
  it("should render two <NavigationItem/> elements if not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItem/> elements if authenticated", () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should render below component if authenticated", () => {
    wrapper.setProps({ isAuth: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)
    ).toEqual(true);
  });
});
