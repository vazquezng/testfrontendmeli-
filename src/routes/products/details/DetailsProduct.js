import React, { Component } from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import PropTypes from "prop-types";
import { formatCurrency } from "helpers/commonfn";

import Card from "components/Card";
import Breadcrumb from "components/Breadcrumb";
import s from "./DetailsProduct.scss";

const ItemType = {
  id: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.shape({
    currency: PropTypes.string,
    amount: PropTypes.number,
    decimals: PropTypes.number
  }),
  picture: PropTypes.string,
  condition: PropTypes.string,
  free_shipping: PropTypes.boolean,
  sold_quantity: PropTypes.number,
  description: PropTypes.string
};

class DetailsProduct extends Component {
  condition = {
    new: "Nuevo",
    used: "Usado"
  };

  renderItems() {
    const { item } = this.props;
    if (!item) return null;

    return (
      <div className={s.details}>
        <div className={s.row}>
          <div className={s.left}>
            <img src={item.picture} />
          </div>
          <div className={s.right}>
            <span className={s.condition}>
              {`${this.condition[item.condition]} - ${
                item.sold_quantity
              } vendidos`}
            </span>
            <span className={s.title}>{item.title}</span>
            <span className={s.price}>
              ${formatCurrency(item.price.amount)}
            </span>
            <button className={s.button}>Comprar</button>
          </div>
        </div>
        <div className={s.description}>
          <span className={s.title}>Descripción del producto</span>
          <span
            className={s.text}
            dangerouslySetInnerHTML={{
              __html: item.description
            }}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={s.container}>
        <Breadcrumb paths={this.props.categories} />
        <Card content={this.renderItems()} padding="maximum" />
      </div>
    );
  }
}

DetailsProduct.propTypes = {
  categories: PropTypes.array.isRequired,
  item: PropTypes.shape(ItemType).isRequired
};
export default withStyles(s)(DetailsProduct);
