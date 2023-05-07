from langchain.llms import GPT4All
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain import LLMChain, PromptTemplate

template = "{prompt}"

def ask_developer_agent(model_path: str, prompt: str) -> str:
  callbacks = [StreamingStdOutCallbackHandler()]
  llm = GPT4All(model=model_path, callbacks=callbacks)
  final_prompt = PromptTemplate(template=template, input_variables=["prompt"])
  llm_chain = LLMChain(llm=llm, prompt=final_prompt)
  return llm_chain.run(prompt)
