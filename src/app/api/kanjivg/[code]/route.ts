import { readFileSync } from 'fs'
import { join } from 'path'
import { NextResponse } from 'next/server'

export async function GET(
  _: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const resolvedParams = await params
    
    const filePath = join(
      process.cwd(),
      'node_modules/kanjivg/build',
      `${resolvedParams.code}.svg`
    )
    const svg = readFileSync(filePath, 'utf-8')
    return new NextResponse(svg, {
      headers: { 'Content-Type': 'image/svg+xml' },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
