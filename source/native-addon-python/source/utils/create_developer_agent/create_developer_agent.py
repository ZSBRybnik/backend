# from langchain.llms import LlamaCpp
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.agents.agent_toolkits import (
    create_vectorstore_agent,
    VectorStoreToolkit,
    VectorStoreInfo,
)
from langchain.agents.agent import AgentExecutor
from langchain import HuggingFaceHub


def create_developer_agent(
    embeddings_model_name: str
) -> AgentExecutor:
    embeddings = HuggingFaceEmbeddings(model_name=embeddings_model_name)
    # callbacks = [StreamingStdOutCallbackHandler()]
    vector_store_main_repository = Chroma(
        embedding_function=embeddings, collection_name="zsbrybnik-main-repository"
    )
    vectorstore_info = VectorStoreInfo(
        name="zsbrybnik-main-repository",
        description="zsbrybnik main repository data",
        vectorstore=vector_store_main_repository,
    )
    toolkit = VectorStoreToolkit(vectorstore_info=vectorstore_info)
    llm = HuggingFaceHub(repo_id="google/flan-t5-xxl")

    # llm = LlamaCpp(
    #    model_path=model_path, callback_manager=callbacks, verbose=True
    # )
    # llm =  # GPT4All(
    # model=model_path,  # backend="gptj", callbacks=callbacks, n_ctx=1024, verbose=False
    # )
    return create_vectorstore_agent(
        llm=llm, toolkit=toolkit, verbose=True, handle_parsing_errors=True, raw_response=True
    )
