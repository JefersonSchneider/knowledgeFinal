module.exports = {
    // Opções do Webpack
    configureWebpack: {
      // Aumenta o limite do tamanho dos arquivos para evitar warnings
      performance: {
        hints: 'warning', // ou 'error' para tratar como erro
        maxAssetSize: 500000, // 500 KB
        maxEntrypointSize: 500000, // 500 KB
      }
    },
    // Outras configurações possíveis
    chainWebpack: config => {
      // Exemplo: Dividir código em chunks menores
      config.optimization.splitChunks({
        chunks: 'all',
      });
    },
    // Configuração para o processo de build
    productionSourceMap: false, // Desativa os sourcemaps para produção (otimiza a build)
  };
  