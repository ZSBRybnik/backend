

def ask_developer_agent(
    agent_executor: any,
    prompt: str,
) -> str:
    return agent_executor.run(prompt)
    # try:
    #    response = agent_executor.run(prompt)
    # except ValueError as e:
    #    response = str(e)
    #    if not response.startswith("Could not parse LLM output: `"):
    #        raise e
    #    response = response.removeprefix(
    #        "Could not parse LLM output: `").removesuffix("`")
    # return response
