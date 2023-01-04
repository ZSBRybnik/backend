use neon::prelude::*;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node"))
}

#[neon::main]
fn main(mut context: ModuleContext) -> NeonResult<()> {
    context.export_function("hello", hello)?;
    Ok(())
}
