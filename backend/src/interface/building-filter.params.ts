import { model, property } from "@loopback/repository";

@model() export class BuildingFilterParams {
  @property() city?: string;
  @property() userId?: string;
}