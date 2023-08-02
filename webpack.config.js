//webpack.config.js
const path = require('path');
const {merge} = require('webpack-merge');

const defaultConfig = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
};

const baseConfig = {
  entry: {
    main: './src/base.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/base.js', // <--- Will be compiled to this single file
  },
};

const userConfig = {
  entry: {
    main: './src/user.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/user.js', // <--- Will be compiled to this single file
  },
};

const groupConfig = {
  entry: {
    main: './src/group.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/group.js', // <--- Will be compiled to this single file
  },
};

const masterGroupConfig = {
  entry: {
    main: './src/master_group.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/master_group.js', // <--- Will be compiled to this single file
  },
};

const productConfig = {
  entry: {
    main: './src/product.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/product.js', // <--- Will be compiled to this single file
  },
};

const groupProductConfig = {
  entry: {
    main: './src/group_for_product.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/group_for_product.js', // <--- Will be compiled to this single file
  },
};

const masterGroupProductConfig = {
  entry: {
    main: './src/master_group_for_product.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/master_group_for_product.js', // <--- Will be compiled to this single file
  },
};

const warehouseConfig = {
  entry: {
    main: './src/warehouse.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/warehouse.js', // <--- Will be compiled to this single file
  },
};

const deliveryAgentConfig = {
  entry: {
    main: './src/delivery_agent.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/delivery_agent.js', // <--- Will be compiled to this single file
  },
};

const shipRequestConfig = {
  entry: {
    main: './src/ship_request.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/ship_request.js', // <--- Will be compiled to this single file
  },
};

const supplierConfig = {
  entry: {
    main: './src/supplier.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/supplier.js', // <--- Will be compiled to this single file
  },
};

const cartConfig = {
  entry: {
    main: './src/cart.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/cart.js', // <--- Will be compiled to this single file
  },
};

const inboundOrderConfig = {
  entry: {
    main: './src/inbound_order.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/inbound_order.js', // <--- Will be compiled to this single file
  },
};

const storeConfig = {
  entry: {
    main: './src/store.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/store.js', // <--- Will be compiled to this single file
  },
};

const incomingStockConfig = {
  entry: {
    main: './src/incoming_stock.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/incoming_stock.js', // <--- Will be compiled to this single file
  },
};

const outgoingStockConfig = {
  entry: {
    main: './src/outgoing_stock.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/outgoing_stock.js', // <--- Will be compiled to this single file
  },
};

const pickupOrderConfig = {
  entry: {
    main: './src/pickup_order.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/pickup_order.js', // <--- Will be compiled to this single file
  },
};

const pickupInboundConfig = {
  entry: {
    main: './src/pickup_inbound.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/pickup_inbound.js', // <--- Will be compiled to this single file
  },
};

const bellConfig = {
  entry: {
    main: './src/bell.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/bell.js', // <--- Will be compiled to this single file
  },
};

const configs = [
  baseConfig,
  userConfig,
  groupConfig,
  masterGroupConfig,
  productConfig,
  groupProductConfig,
  masterGroupProductConfig,
  warehouseConfig,
  deliveryAgentConfig,
  shipRequestConfig,
  supplierConfig,
  cartConfig,
  inboundOrderConfig,
  storeConfig,
  incomingStockConfig,
  outgoingStockConfig,
  pickupOrderConfig,
  pickupInboundConfig,
  bellConfig,
].map(conf => merge(defaultConfig, conf));

module.exports = configs;
