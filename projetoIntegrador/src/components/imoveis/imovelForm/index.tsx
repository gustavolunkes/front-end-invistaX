import React, { useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Home, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CommandList } from "cmdk";
import { CityAttributes } from "@/service/route/city/city";
import { Api } from "@/service/api";
import {
  ImovelAttributes,
  ImovelDTOAttributes,
} from "@/service/route/imovel/imovel";
import { OwnerAttributes } from "@/service/route/owner/owner";
import { AuthContext } from "@/contexts/AuthContexts";

const formSchema = z.object({
  nomeImovel: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  valueRegistration: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: "O valor da matrícula deve ser um número positivo",
    }),
  dateValue: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Formato de data inválido. Use AAAA-MM-DD",
  }),
  street: z
    .string()
    .min(2, { message: "Rua deve ter pelo menos 2 caracteres" }),
  neighborhood: z
    .string()
    .min(2, { message: "Bairro deve ter pelo menos 2 caracteres" }),
  number: z.string().min(1, { message: "Número é obrigatório" }),
  city: z.string().min(2, { message: "Cidade é obrigatória" }),
  state: z.string().min(2, { message: "Estado é obrigatório" }),
  cep: z.string().min(5, { message: "CEP é obrigatório" }),
  owner: z.string().min(1, "Proprietário é obrigatório"),
});

type FormValues = z.infer<typeof formSchema>;

const brazilianStates = [
  { id: 1, value: "AC", label: "Acre" },
  { id: 2, value: "AL", label: "Alagoas" },
  { id: 3, value: "AP", label: "Amapá" },
  { id: 4, value: "AM", label: "Amazonas" },
  { id: 5, value: "BA", label: "Bahia" },
  { id: 6, value: "CE", label: "Ceará" },
  { id: 7, value: "DF", label: "Distrito Federal" },
  { id: 8, value: "ES", label: "Espírito Santo" },
  { id: 9, value: "GO", label: "Goiás" },
  { id: 10, value: "MA", label: "Maranhão" },
  { id: 11, value: "MT", label: "Mato Grosso" },
  { id: 12, value: "MS", label: "Mato Grosso do Sul" },
  { id: 13, value: "MG", label: "Minas Gerais" },
  { id: 14, value: "PA", label: "Pará" },
  { id: 15, value: "PB", label: "Paraíba" },
  { id: 16, value: "PR", label: "Paraná" },
  { id: 17, value: "PE", label: "Pernambuco" },
  { id: 18, value: "PI", label: "Piauí" },
  { id: 19, value: "RJ", label: "Rio de Janeiro" },
  { id: 20, value: "RN", label: "Rio Grande do Norte" },
  { id: 21, value: "RS", label: "Rio Grande do Sul" },
  { id: 22, value: "RO", label: "Rondônia" },
  { id: 23, value: "RR", label: "Roraima" },
  { id: 24, value: "SC", label: "Santa Catarina" },
  { id: 25, value: "SP", label: "São Paulo" },
  { id: 26, value: "SE", label: "Sergipe" },
  { id: 27, value: "TO", label: "Tocantins" },
];

interface ImovelFormProps {
  imoveis?: ImovelAttributes[];
  setShowModal?: (show: boolean) => void;
  setImoveis?: (imoveis: ImovelAttributes[]) => void;
  imovelParaEditar?: ImovelAttributes | null;
  onSave?: (dadosEditados: Partial<ImovelDTOAttributes>) => void;
}

export const ImovelForm = ({
  imoveis,
  setShowModal,
  setImoveis,
  imovelParaEditar,
  onSave,
}: ImovelFormProps) => {
  const { user } = useContext(AuthContext);
  const api = new Api();
  const today = new Date().toISOString().split("T")[0];
  const [imovelEditDTO, setImovelEditDTO] =
    useState<Partial<ImovelDTOAttributes>>();
  const [propertieDTO, setPropertieDTO] = useState<ImovelDTOAttributes>({
    nomeImovel: "",
    street: "",
    number: 0,
    neighborhood: "",
    valueRegistration: "",
    dateValue: new Date(),
    cityId: 0,
    cep: 0,
    userId: user,
    ownerId: 0,
  });

  const updateDTO = (field: keyof ImovelDTOAttributes, value: any) => {
    if (imovelParaEditar) {
      setImovelEditDTO((prev) => ({ ...prev, [field]: value }));
      return;
    }
    setPropertieDTO((prev) => ({ ...prev, [field]: value }));
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cep: imovelParaEditar.adress.cep.toString() || "",
      city: imovelParaEditar.adress.city.nome || "",
      dateValue: imovelParaEditar.date_Value || "",
      nomeImovel: imovelParaEditar.nome_imovel || "",
      number: imovelParaEditar.adress.number.toString() || "",
      state: imovelParaEditar.adress.city.state.name || "",
      street: imovelParaEditar.adress.street || "",
      valueRegistration: imovelParaEditar.valueRegistration.toString() || "",
      neighborhood: imovelParaEditar.adress.neighborhood || "",
      owner: imovelParaEditar.owner.name || "",
    },
  });

  const [city, setCity] = useState<CityAttributes[]>([]);
  const [owners, setOwners] = useState<OwnerAttributes[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCity(id: Number) {
    const response = await api.city.getByState(id);
    setCity(response);
  }

  useEffect(() => {
    async function getOwners() {
      const response = await api.owner.getByUser(user);
      setOwners(response);
    }
    getOwners();
  }, []);

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (imovelParaEditar) {
        const response = await api.imovel.updateByIMovel(
          imovelEditDTO,
          imovelParaEditar.id_imovel
        );
        setImoveis([...imoveis, response]);
      } else {
        const response = await api.imovel.createByImovel(propertieDTO);
        setImoveis([...imoveis, response]);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao salvar imóvel:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gray-100 text-gray-800 p-6 rounded-t-2xl relative border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gray-200 p-3 rounded-full">
                <Home size={32} className="text-gray-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {imovelParaEditar ? "Editar Imóvel" : "Cadastrar Novo Imóvel"}
                </h2>
                <p className="text-gray-600">
                  {imovelParaEditar
                    ? "Altere as informações do imóvel"
                    : "Preencha os dados do imóvel"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Home className="mr-2 h-5 w-5" />
                      Informações Básicas
                    </h3>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="nomeImovel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do Imóvel</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Apartamento Centro"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  updateDTO("nomeImovel", e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormDescription>
                              Um nome para identificar seu imóvel
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="dateValue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Data da Matrícula</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  {...field}
                                  max={today}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    updateDTO(
                                      "dateValue",
                                      new Date(e.target.value)
                                    );
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="valueRegistration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Valor da Matrícula (R$)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    updateDTO(
                                      "valueRegistration",
                                      e.target.value
                                    );
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="owner"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Proprietário</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? owners.find(
                                          (owner) => owner.name === field.value
                                        )?.name
                                      : "Selecione um proprietário"}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput placeholder="Buscar proprietário..." />
                                  <CommandEmpty className="p-4 text-center">
                                    <span className="text-gray-500">
                                      Nenhum proprietário encontrado.
                                    </span>
                                  </CommandEmpty>
                                  <CommandList className="max-h-48 overflow-y-auto">
                                    <CommandGroup>
                                      {owners.map((owner) => (
                                        <CommandItem
                                          key={owner.id.toString()}
                                          value={owner.name}
                                          onSelect={(e) => {
                                            field.onChange(e);
                                            updateDTO("ownerId", owner.id);
                                          }}
                                        >
                                          {owner.name}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <MapPin className="mr-2 h-5 w-5" />
                      Localização
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="street"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rua</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nome da rua"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    updateDTO("street", e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="123"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    updateDTO("number", Number(e.target.value));
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="neighborhood"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bairro</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nome do bairro"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  updateDTO("neighborhood", e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? brazilianStates.find(
                                          (state) => state.value === field.value
                                        )?.label
                                      : "Selecione um estado"}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput placeholder="Buscar estado..." />
                                  <CommandEmpty>
                                    Nenhum estado encontrado.
                                  </CommandEmpty>
                                  <CommandList className="max-h-48 overflow-y-auto">
                                    <CommandGroup>
                                      {brazilianStates.map((state) => (
                                        <CommandItem
                                          key={state.value}
                                          value={state.value}
                                          onSelect={() => {
                                            form.setValue("state", state.value);
                                            handleCity(state.id);
                                          }}
                                        >
                                          {state.label}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cidade</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? city.find((c) => c.nome === field.value)
                                          ?.nome
                                      : "Selecione uma cidade"}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput placeholder="Buscar cidade..." />
                                  <CommandEmpty>
                                    Nenhuma cidade encontrada.
                                  </CommandEmpty>
                                  <CommandList className="max-h-48 overflow-y-auto">
                                    <CommandGroup>
                                      {city.map((c) => (
                                        <CommandItem
                                          key={c.nome}
                                          value={c.nome}
                                          onSelect={(e) => {
                                            field.onChange(e);
                                            updateDTO("cityId", c.id);
                                          }}
                                        >
                                          {c.nome}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cep"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CEP</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="00000-000"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  updateDTO(
                                    "cep",
                                    Number(e.target.value.replace(/\D/g, ""))
                                  );
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center gap-4 pt-8">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 px-8"
                >
                  {isSubmitting
                    ? "Salvando..."
                    : imovelParaEditar
                    ? "Salvar Alterações"
                    : "Cadastrar Imóvel"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="px-8"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
