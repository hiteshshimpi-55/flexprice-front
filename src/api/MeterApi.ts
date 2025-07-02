import { AxiosClient } from '@/core/axios/verbs';
import { Meter } from '@/models/Meter';
import { Pagination } from '@/models/Pagination';
import { GetAllMetersResponse } from '@/types/dto';

export class MeterApi {
	private static baseUrl = '/meters';

	public static async createMeter(data: Partial<Meter>) {
		return await AxiosClient.post<Meter, Partial<Meter>>(this.baseUrl, data);
	}
	public static async getAllMeters({ limit, offset }: Pagination) {
		return await AxiosClient.get<GetAllMetersResponse>(`${this.baseUrl}?limit=${limit}&offset=${offset}`);
	}
	public static async getAllActiveMeters() {
		return await AxiosClient.get<GetAllMetersResponse>(`${this.baseUrl}?status=published&limit=1000`);
	}

	public static async getMeterById(id: string) {
		return await AxiosClient.get<Meter>(`${this.baseUrl}/${id}`);
	}

	public static async updateMeter(id: string, data: Partial<Meter>) {
		return await AxiosClient.put<Meter, Partial<Meter>>(`${this.baseUrl}/${id}`, data);
	}

	public static async deleteMeter(id: string) {
		return await AxiosClient.delete<void>(`${this.baseUrl}/${id}`);
	}
}
