export default class Flight {
	constructor(
		sigla_icao_empresa_aerea,
		empresa_aerea,
		numero_voo,
		codigo_di,
		codigo_tipo_linha,
		modelo_equipamento,
		numero_de_assentos,
		sigla_icao_aeroporto_origem,
		descricao_aeroporto_origem,
		partida_prevista,
		partida_real,
		sigla_icao_aeroporto_destino,
		descricao_aeroporto_destino,
		chegada_prevista,
		chegada_real,
		situacao_voo,
		justificativa,
		referencia,
		situacao_partida,
		situacao_chegada
	) {
		this.sigla_icao_empresa_aerea = sigla_icao_empresa_aerea;
		this.empresa_aerea = empresa_aerea;
		this.numero_voo = numero_voo;
		this.codigo_di = codigo_di;
		this.codigo_tipo_linha = codigo_tipo_linha;
		this.modelo_equipamento = modelo_equipamento;
		this.numero_de_assentos = numero_de_assentos;
		this.sigla_icao_aeroporto_origem = sigla_icao_aeroporto_origem;
		this.descricao_aeroporto_origem = descricao_aeroporto_origem;
		this.partida_prevista = this.convertStringToData(partida_prevista);
		this.partida_real = this.convertStringToData(partida_real);
		this.sigla_icao_aeroporto_destino = sigla_icao_aeroporto_destino;
		this.descricao_aeroporto_destino = descricao_aeroporto_destino;
		this.chegada_prevista = this.convertStringToData(chegada_prevista);
		this.chegada_real = this.convertStringToData(chegada_real);
		this.situacao_voo = situacao_voo;
		this.justificativa = justificativa;
		this.referencia = referencia;
		this.situacao_partida = situacao_partida;
		this.situacao_chegada = situacao_chegada;
	}

	convertStringToData(string) {
		if (string !== '' && string !== null) {
			const dateString = string;
			const [datePart, timePart] = dateString.split(' ');
			const [day, month, year] = datePart.split('/');
			const [hour, minute] = timePart.split(':');
			return new Date(year, month - 1, day, hour, minute);
		}
	}
}
