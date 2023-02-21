try {
    context.Log('完了したものは読取専用');
    if (model.Status === 900) {
        model.ReadOnly = true;
    }
} catch (e) {
    context.Log(e.stack);
}