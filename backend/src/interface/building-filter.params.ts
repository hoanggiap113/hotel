import { model, property } from "@loopback/repository";

@model() export class BuildingFilterParams {
  @property() city?: string;
  @property() userId?: string;
  @property() name?: string;
  @property() checkIn?: string;
  @property() checkOut?: string;
  @property() amenities?: string[];
}