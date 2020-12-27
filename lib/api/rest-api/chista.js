const ChistaESModule = require('chista');

const Chista = ChistaESModule.default;

module.exports = new Chista({
    defaultLogger : (type, data) => {
        const { result } = data;

        if (result instanceof Error || type === 'error') console.error({ type, data });
    }
});
