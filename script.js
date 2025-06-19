// Entrenamiento ultraacelerado para OMNIXIA CORE Unlimited
async function loadTrainingData() {
  try {
    const [productsRes, statsRes, campaignsRes] = await Promise.all([
      fetch('real-products.json'),
      fetch('shopify-stats.csv'),
      fetch('viral-campaigns.md')
    ]);

    const products = await productsRes.json();
    const statsText = await statsRes.text();
    const campaignsText = await campaignsRes.text();

    const stats = statsText.split('\n').slice(1).map(row => {
      const [product, views, clicks, sales] = row.split(',');
      return { product, views: +views, clicks: +clicks, sales: +sales };
    });

    window.OMNIXIA_CORE = {
      training: {
        products,
        stats,
        campaigns: campaignsText
      },
      status: 'trained',
      getSummary: () => ({
        topProduct: products[0].name || 'N/A',
        insights: `Loaded ${products.length} products and ${stats.length} stats rows.`
      })
    };

    console.log('[OMNIXIA] 🚀 Entrenamiento completo.');
    console.table(window.OMNIXIA_CORE.getSummary());
  } catch (err) {
    console.error('[OMNIXIA] ❌ Fallo al cargar datos de entrenamiento:', err);
  }
}

// Ejecutar al iniciar
loadTrainingData();
console.log('OMNIXIA CORE Loaded');
