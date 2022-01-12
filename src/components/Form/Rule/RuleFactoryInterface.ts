import RuleInterface from "@/components/Form/Rule/RuleInterface";

export default interface RuleFactoryInterface {
    createRequiredRule(): RuleInterface;
}
