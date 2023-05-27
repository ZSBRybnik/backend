from langchain.llms import GPT4All
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.agents.agent_toolkits import (
    create_vectorstore_agent,
    VectorStoreToolkit,
    VectorStoreInfo,
)


def ask_developer_agent(
    model_path: str, embeddings_model_name: str, prompt: str
) -> None:
    embeddings = HuggingFaceEmbeddings(model_name=embeddings_model_name)
    callbacks = [StreamingStdOutCallbackHandler()]
    vector_store_main_repository = Chroma(
        embedding_function=embeddings, collection_name="zsbrybnik-main-repository")
    vectorstore_info = VectorStoreInfo(
        name="zsbrybnik-main-repository",
        description="zsbrybnik main repository data",
        vectorstore=vector_store_main_repository
    )
    toolkit = VectorStoreToolkit(vectorstore_info=vectorstore_info)
    llm = GPT4All(model=model_path, backend='gptj', callbacks=callbacks,
                  n_ctx=1024, verbose=False)
    agent_executor = create_vectorstore_agent(
        llm=llm,
        toolkit=toolkit,
        verbose=True,
        handle_parsing_errors=True
    )
    try:
        response = agent_executor.run(prompt)
    except ValueError as e:
        response = str(e)
        if not response.startswith("Could not parse LLM output: `"):
            raise e
        response = response.removeprefix("Could not parse LLM output: `").removesuffix("`")
    return response
    
