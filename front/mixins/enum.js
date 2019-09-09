export const enumMap = {
  methods: {
    getObjectiveName(objective) {
      let name = ''
      switch (objective) {
        case 'talentoHumano':
          name = 'Talento Humano'
          break
        case 'gestaoQualidade':
          name = 'Gestão e Qualidade'
          break
        case 'clienteMercado':
          name = 'Cliente e Mercado'
          break
        case 'inovacao':
          name = 'Inovação'
          break
        case 'sociedadeMeioAmbiente':
          name = 'Sociedade e Meio Ambiente'
          break
        default:
          break
      }
      return name
    }
  }
}
