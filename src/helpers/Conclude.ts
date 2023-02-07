import {useCaseStore} from "@/stores/useCaseStore";

function Conclude(): string {
    const data = useCaseStore()
    let complexity: number = 0
    let extensions: string = ''
    let output: string = `# ${data.title}`
    output += `\n**Ator principal**: ${data.actor}`
    output += `\n## Fluxo`
    data.flow.forEach((flow, id) => {
        const itemId = id + 1
        output += `\n${itemId}) ${flow.actor} ${flow.verb} ${flow.description}`
        if (flow.useCase) {
            output += " (Caso de uso existente)"
        } else {
            complexity += 1
        }
        flow.extensions.forEach((sub, subId) => {
            extensions += `\n${itemId}.${subId + 1}) ${sub}`
            complexity += .25
        })
    })
    if (extensions.length) {
        output += `\n### Extensões`
        output += extensions
    }
    output += `\n\n **Complexidade**: ${complexity}`
    return output
}
export default Conclude