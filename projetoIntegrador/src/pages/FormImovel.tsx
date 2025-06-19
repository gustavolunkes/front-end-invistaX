import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

<<<<<<< Updated upstream
export function FormImovel({ setShowModal }: Props) {
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    valorCompra: "",
    valorAtual: "",
    aluguelMensal: "",
    status: "vago",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Imóvel enviado:", formData);
    // Aqui você pode integrar com a API (ex: imovelRoute.createImovel(formData))
    setShowModal(false);
=======
interface ImovelFormData {
  nomeImovel: string;
  valueRegistration: string;
  street: string;
  number: string;
  neighborhood: string;
  cep: string;
  phone: string;
  dateRegistration: string;
  state: string;
  city: string;
  ownerId: string;
  ativo: string; 
}

interface ViaCepResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface Owner {
  id: number;
  name: string;
  phone: string; 
  cpf_cnpj?: number;
  email?: string;
  ativo?: boolean;
}

interface Cidade {
  id: number;
  nome: string;
  uf: string;
}

interface Estado {
  id: number;
  name: string; 
}

export function FormImovel({ setShowModal, onSuccess, imovel, modoEdicao }: FormImovelProps) {
  const [formData, setFormData] = useState<ImovelFormData>({
    nomeImovel: "",
    valueRegistration: "",
    street: "",
    number: "",
    neighborhood: "",
    cep: "",
    phone: "",
    dateRegistration: "",
    state: "",
    city: "",
    ownerId: "",
    ativo: '',  // Add this line
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [owners, setOwners] = useState<Owner[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [estados, setEstados] = useState<Estado[]>([]);

  useEffect(() => {
    async function loadOwners() {
      try {
        const response = await Api.get('/owner');
        setOwners(response.data);
      } catch (error) {
        console.error('Erro ao carregar proprietários:', error);
        setError('Erro ao carregar lista de proprietários');
      }
    }

    loadOwners();
  }, []);

  useEffect(() => {
    async function loadEstados() {
      try {
        const states = await stateRoute.getAll();
        // Mapear os dados para corresponder à interface Estado
        const estadosMapeados = states.map((state: any) => ({
          id: state.id,
          name: state.nome || state.name, // Ajuste conforme a propriedade correta da API
        }));
        setEstados(estadosMapeados);
      } catch (error) {
        console.error('Erro ao carregar estados:', error);
        setError('Erro ao carregar lista de estados');
      }
    }

    loadEstados();
  }, []);

  const buscarCidades = async (estadoId: string) => {
    try {
      setCidades([]);
      setError('');
      if (!estadoId) {
        setError('Selecione um estado');
        return;
      }
      const response = await Api.get(`/city/${estadoId}`);
      const data = response.data;
      if (!Array.isArray(data)) throw new Error('Dados de cidades em formato inválido');
      setCidades(data.map((cidade: any) => ({
        id: cidade.id,
        nome: cidade.nome,
        uf: cidade.uf 
      })));
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      setError('Erro ao carregar lista de cidades');
      setCidades([]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'state') {
      setFormData(prev => ({ ...prev, city: '' }));
      buscarCidades(value);
    }

    if (name === 'ownerId') {
      const owner = owners.find(o => String(o.id) === String(value));
      setFormData(prev => ({
        ...prev,
        phone: owner ? String(owner.phone) : "" // Garantir que seja string
      }));
    }
  };

  const buscarEnderecoPorCep = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    try {
      setLoading(true);
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json() as ViaCepResponse;

      if (data.logradouro) {
        setFormData((prev) => ({
          ...prev,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setError("Erro ao buscar endereço. Verifique o CEP informado.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.ownerId || !formData.state || !formData.city) {
      setError("Preencha todos os campos obrigatórios.");
      setLoading(false);
      return;
    }

    try {
      const registrationValue = parseFloat(
        formData.valueRegistration
          .replace("R$ ", "")
          .replace(/\./g, "")
          .replace(",", ".")
      );

      // Busca o telefone do proprietário selecionado
      const owner = owners.find(o => String(o.id) === String(formData.ownerId));
      const phone = owner ? String(owner.phone) : ""; // Manter como string

      const payload = {
        nomeImovel: formData.nomeImovel,
        valueRegistration: registrationValue,
        street: formData.street,
        number: parseInt(formData.number),
        neighborhood: formData.neighborhood,
        cep: formData.cep.replace(/\D/g, ""),
        dateValue: formData.dateRegistration,
        cityId: parseInt(formData.city),
        ownerId: parseInt(formData.ownerId),
        userId: 1,
        ativo: formData.ativo === 'true',
        phone // Agora é string
      };

      console.log("payload:", payload);

      if (modoEdicao && imovel) {
        await Api.put(`/imovel/${imovel.id}`, payload);
      } else {
        await Api.post("/imovel", payload);
      }
      onSuccess();
      setShowModal(false);
    } catch (error: any) {
      console.error("Erro ao criar imóvel:", error);
      setError(error.response?.data?.message || "Erro ao criar imóvel. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (imovel) {
    setFormData({
      nomeImovel: imovel.nome || imovel.nomeImovel || "",
      valueRegistration: imovel.valorCompra?.toString() || imovel.valueRegistration?.toString() || "",
      street: imovel.street || "",
      number: imovel.number?.toString() || "",
      neighborhood: imovel.neighborhood || "",
      cep: imovel.cep || "",
      phone: String(imovel.phone || ""), // Garantir que seja string
      dateRegistration: imovel.dateRegistration || "",
      city: imovel.cityId?.toString() || "",
      state: imovel.stateId?.toString() || "",
      ownerId: imovel.ownerId?.toString() || "",
      ativo: imovel.ativo?.toString() || "",
    });
  }
}, [imovel]);

  // Mapeamento de nome para UF
  const ESTADO_TO_UF: { [nome: string]: string } = {
    "Acre": "AC",
    "Alagoas": "AL",
    "Amapá": "AP",
    "Amazonas": "AM",
    "Bahia": "BA",
    "Ceará": "CE",
    "Distrito Federal": "DF",
    "Espírito Santo": "ES",
    "Goiás": "GO",
    "Maranhão": "MA",
    "Mato Grosso": "MT",
    "Mato Grosso do Sul": "MS",
    "Minas Gerais": "MG",
    "Pará": "PA",
    "Paraíba": "PB",
    "Paraná": "PR",
    "Pernambuco": "PE",
    "Piauí": "PI",
    "Rio de Janeiro": "RJ",
    "Rio Grande do Norte": "RN",
    "Rio Grande do Sul": "RS",
    "Rondônia": "RO",
    "Roraima": "RR",
    "Santa Catarina": "SC",
    "São Paulo": "SP",
    "Sergipe": "SE",
    "Tocantins": "TO"
  };

  // Mapeamento de ID de estado para UF
  const ESTADO_ID_TO_UF: { [id: number]: string } = {
    1: "AC",
    2: "GO",
    3: "DF",
    4: "PR",
    5: "PB",
    6: "PI",
    7: "RS",
    8: "PE",
    9: "SE",
    10: "AL",
    11: "MA",
    12: "SP",
    13: "PR",
    14: "GO",
    15: "PE",
    16: "SE",
    17: "MG",
    18: "AL",
    19: "PA",
    20: "TO",
    21: "RJ",
    22: "TO",
    23: "SE",
    24: "PR",
    25: "MA",
    26: "DF",
    27: "PE",
    28: "MS",
    29: "GO",
    30: "MG",
    31: "PR",
    32: "MS",
    33: "PE",
    34: "DF",
    35: "RJ",
    36: "TO",
    37: "MA",
    38: "SE",
    39: "GO",
    40: "MG",
    41: "SP",
    42: "RJ",
    43: "MG",
    44: "SP",
    45: "RJ",
    46: "MG",
    47: "PR",
    48: "SP",
    49: "RJ"
>>>>>>> Stashed changes
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Novo Imóvel</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
<<<<<<< Updated upstream
          <Input placeholder="Nome do imóvel" name="nome" value={formData.nome} onChange={handleChange} />
          <Input placeholder="Endereço" name="endereco" value={formData.endereco} onChange={handleChange} />
          <Input type="number" placeholder="Valor de compra" name="valorCompra" value={formData.valorCompra} onChange={handleChange} />
          <Input type="number" placeholder="Valor atual" name="valorAtual" value={formData.valorAtual} onChange={handleChange} />
          <Input type="number" placeholder="Aluguel mensal" name="aluguelMensal" value={formData.aluguelMensal} onChange={handleChange} />
          <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="vago">Vago</option>
            <option value="alugado">Alugado</option>
          </select>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">Salvar</Button>
=======
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Adicionar Novo Imóvel</h2>
            <p className="text-gray-500">
              Preencha os detalhes do seu imóvel. Todos os campos marcados com * são obrigatórios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Home className="text-gray-500" size={24} />
                <h3 className="text-lg font-semibold">Informações Básicas</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome do Imóvel *</label>
                  <Input
                    name="nomeImovel"
                    value={formData.nomeImovel}
                    onChange={handleInputChange}
                    placeholder="Apartamento Centro"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Data da Matrícula *</label>
                    <Input
                      type="date"
                      name="dateRegistration"
                      value={formData.dateRegistration}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Valor da Matrícula *</label>
                    <NumericFormat
                      customInput={Input}
                      name="valueRegistration"
                      value={formData.valueRegistration}
                      onValueChange={(values) => {
                        setFormData((prev) => ({
                          ...prev,
                          valueRegistration: values.value,
                        }));
                      }}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      prefix="R$ "
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      fixedDecimalScale
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Proprietário *</label>
                  <select
                    name="ownerId"
                    value={formData.ownerId}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Selecione um proprietário</option>
                    {owners.map(owner => (
                      <option key={owner.id} value={owner.id}>
                        {owner.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Telefone</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    readOnly
                    className={`flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ${formData.phone ? "bg-gray-100 text-gray-500" : ""}`}
                    placeholder="Telefone do proprietário"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status *</label>
                  <select
                    name="ativo"
                    value={formData.ativo}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Selecione o status</option>
                    <option value="true">Ativo</option>
                    <option value="false">Inativo</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-gray-500" size={24} />
                <h3 className="text-lg font-semibold">Localização e Características</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Rua *</label>
                    <Input
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Número *</label>
                    <Input
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bairro *</label>
                  <Input
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Estado *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Selecione um estado</option>
                      {estados.map(estado => (
                        <option key={estado.id} value={estado.id}>
                          {estado.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Cidade *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Selecione uma cidade</option>
                      {cidades
                        .filter(cidade => cidade.nome)
                        .map(cidade => (
                          <option key={cidade.id} value={cidade.id}>
                            {cidade.nome}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">CEP *</label>
                  <PatternFormat
                    customInput={Input}
                    format="#####-###"
                    mask="_"
                    value={formData.cep}
                    onValueChange={(values) => {
                      const newCep = values.value;
                      setFormData((prev) => ({ ...prev, cep: newCep }));
                      if (newCep.length === 8) {
                        buscarEnderecoPorCep(newCep);
                      }
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex gap-2 justify-end mt-6">
            <Button
              type="submit"
              className="py-0.5 px-3 text-xs h-8 bg-green-100 text-green-700 border-none hover:bg-green-600 hover:text-white transition"
            >
              Salvar
            </Button>
            <Button
              type="button"
              onClick={() => setShowModal(false)}
              className="py-0.5 px-3 text-xs h-8 bg-red-100 text-red-700 border-none hover:bg-red-600 hover:text-white transition"
            >
              Cancelar
            </Button>
>>>>>>> Stashed changes
          </div>
        </form>
      </div>
    </div>
  );
}
