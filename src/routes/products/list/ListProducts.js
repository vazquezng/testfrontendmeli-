import React, { Component } from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Link from "components/Link";
import Card from "components/Card";
import Breadcrumb from "components/Breadcrumb";

import { getUrl, formatCurrency } from "helpers/commonfn";

import icShipping from "assets/ic_shipping@2x.png";
import s from "./ListProducts.scss";

class ListProducts extends Component {
  renderItems() {
    const lastIndex = this.props.items.length - 1;
    return (
      <div className={s.container}>
        {this.props.items.map((item, index) => (
          <React.Fragment key={item.id}>
            <div key={item.id} className={s.containerItem}>
              <div>
                <Link to={getUrl("detailsProduct", { id: item.id })}>
                  <img className={s.thumbnail} src={item.picture} />
                </Link>
              </div>
              <div className={s.details}>
                <div className={s.header}>
                  <div>
                    <span className={s.price}>
                      ${formatCurrency(item.price.amount)}
                    </span>
                    {item.free_shipping && (
                      <img
                        className={s.freeShipping}
                        src={icShipping}
                        srcSet={`${icShipping} 2x`}
                      />
                    )}
                  </div>
                  <span className={s.city}>{item.state_name}</span>
                </div>
                <div className={s.title}>
                  <Link to={getUrl("detailsProduct", { id: item.id })}>
                    <span>{item.title}</span>
                  </Link>
                </div>
              </div>
            </div>
            {index != lastIndex && <hr />}
          </React.Fragment>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Breadcrumb paths={this.props.categories} />
        <Card content={this.renderItems()} padding="minimum" />
      </div>
    );
  }
}

export default withStyles(s)(ListProducts);
