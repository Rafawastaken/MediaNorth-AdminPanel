const ContractTypeInput = ({ value, onChange }) => (
  <div className="flex flex-1 flex-col items-start gap-1">
    <label htmlFor="contractType" className="text-sm font-medium">
      Tipo de Contrato *
    </label>

    <select
      id="contractType"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className="w-full rounded-md border border-gray-200 px-2 py-2 text-sm font-normal"
    >
      <option value="" disabled hidden>
        Selecionar tipo de contrato
      </option>
      <option value="fixedValue">Valor Fixo</option>
      <option value="sellingPercentage">Percentagem</option>
      <option value="free">Gratuito</option>
    </select>
  </div>
);

export default ContractTypeInput;
