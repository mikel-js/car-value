import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  public make: string;

  @IsString()
  public model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2050)
  public year: number;

  @Transform(({ value }) => parseInt(value))
  @Min(0)
  @Max(1000000)
  @IsNumber()
  public mileage: number;

  @Transform(({ value }) => parseInt(value))
  @IsLongitude()
  @IsNumber()
  public lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  @IsNumber()
  public lat: number;
}
