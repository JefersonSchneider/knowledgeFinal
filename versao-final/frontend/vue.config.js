const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  configureWebpack: config => {
    // Performance thresholds para evitar os warnings
    config.performance = {
      hints: 'warning', // Ou 'error' se quiser falhar build com excesso
      maxAssetSize: 1024000, // 1MB - aumenta o limite para evitar warning
      maxEntrypointSize: 1024000,
    };

    // Plugins adicionais (analisador de bundle)
    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static', // gera um arquivo HTML
      openAnalyzer: false,    // não abre o navegador automaticamente
      reportFilename: 'report.html'
    }));
  },

  chainWebpack: config => {
    // Melhor divisão de código para otimizar o carregamento
    config.optimization.splitChunks({
      chunks: 'all',
    });
  },

  productionSourceMap: false, // Melhora segurança/performance em produção
};
