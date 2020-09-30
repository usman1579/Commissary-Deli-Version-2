import React,{Component} from 'react';

import {connect} from 'react-redux';
import {DrawerActions} from '@react-navigation/native';

import {ScrollView, View, Dimensions, Text} from 'react-native';

import {ThemedView, Header} from 'src/components';
import {IconHeader, Logo, CartIcon} from 'src/containers/HeaderComponent';
import ModalHomePopup from 'src/containers/ModalHomePopup';

import {
  dataConfigSelector,
  toggleSidebarSelector,
} from 'src/modules/common/selectors';

// Containers
import Slideshow from './home/containers/Slideshow';
import CategoryList from './home/containers/CategoryList';
import ProductList from './home/containers/ProductList';
import ProductCategory from './home/containers/ProductCategory';
import Banners from './home/containers/Banners';
import TextInfo from './home/containers/TextInfo';
import CountDown from './home/containers/CountDown';
import BlogList from './home/containers/BlogList';
import Testimonials from './home/containers/Testimonials';
import Button from './home/containers/Button';
import Vendors from './home/containers/Vendors';
import Search from './home/containers/Search';
import Divider from './home/containers/Divider';
import Locator from './home/containers/Locator'

const {width} = Dimensions.get('window');

const containers = {
  slideshow: Slideshow,
  categories: CategoryList,
  products: ProductList,
  productcategory: ProductCategory,
  banners: Banners,
  text: TextInfo,
  countdown: CountDown,
  blogs: BlogList,
  testimonials: Testimonials,
  button: Button,
  vendors: Vendors,
  search: Search,
  divider: Divider,
  // Locator:Locator
};

const widthComponent = (spacing) => {
  if (!spacing) {
    return width;
  }
  const marginLeft =
    spacing.marginLeft && parseInt(spacing.marginLeft, 10)
      ? parseInt(spacing.marginLeft, 10)
      : 0;
  const marginRight =
    spacing.marginRight && parseInt(spacing.marginRight, 10)
      ? parseInt(spacing.marginRight, 10)
      : 0;
  const paddingLeft =
    spacing.paddingLeft && parseInt(spacing.paddingLeft, 10)
      ? parseInt(spacing.paddingLeft, 10)
      : 0;
  const paddingRight =
    spacing.paddingRight && parseInt(spacing.paddingRight, 10)
      ? parseInt(spacing.paddingRight, 10)
      : 0;
  return width - marginLeft - marginRight - paddingLeft - paddingRight;
};

class HomeScreen extends Component {

  constructor(){
    super()
    // console.log('Constructor')
    this.state={
    }
  }  

  renderContainer(config) {
    // console.log("Hello world!");
    const Container = containers[config.type];
    if (!Container) {
      return null;
    }
    return (
      <View key={config.id} style={config.spacing && config.spacing}>
        <Container
          {...config}
          widthComponent={widthComponent(config.spacing)}
        />
      </View>
    );
  };



  render() {
    // const { category, product } = this.props;
    const {config, toggleSidebar, navigation} = this.props;

    return (


      <ThemedView isFullView>
        <Header
          leftComponent={
            toggleSidebar ? (
              <IconHeader
                name="align-left"
                size={22}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            ) : null
          }
          centerComponent={<Logo />}
          rightComponent={<CartIcon />}
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
             <Locator/>
          {config.map((data) => this.renderContainer(data))}
        </ScrollView>
        <ModalHomePopup />
      </ThemedView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    config: dataConfigSelector(state),
    toggleSidebar: toggleSidebarSelector(state),
  };
};

export default connect(mapStateToProps)(HomeScreen);
